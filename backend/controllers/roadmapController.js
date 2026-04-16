const { GoogleGenAI } = require('@google/genai');
const Roadmap = require('../models/Roadmap');

const ALL_TOPICS_LIST = [
  'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue',
  'Recursion', 'Dynamic Programming', 'Trees', 'Graphs',
  'Greedy', 'Backtracking'
];

exports.generateRoadmap = async (req, res) => {
  try {
    const { duration = 15, difficulty = 'Beginner', topics = [], mode = 'ALL', weakTopics = [] } = req.body;

    // 2. Topic Logic: ALL vs CUSTOM
    const finalTopics = mode === 'ALL' ? ALL_TOPICS_LIST : topics;
    
    console.log("Mode:", mode);
    console.log("Selected Topics:", topics);
    console.log("Final Topics:", finalTopics);

    if (finalTopics.length === 0) {
      return res.status(400).json({ success: false, error: 'No topics selected.' });
    }

    const topicsStr = finalTopics.join(", ");
    const weakTopicsStr = weakTopics.length > 0 ? weakTopics.join(", ") : "None";

    // 3. AI Integration
    const prompt = `You are an expert DSA mentor.

Generate a STRICTLY personalized and highly structured DSA roadmap.

User Inputs:
- Total Days: ${duration}
- Difficulty: ${difficulty}
- Mode: ${mode}
- Final Topics To Use: ${topicsStr}
- Weak Topics: ${weakTopicsStr}

IMPORTANT RULES:

1. Topic Handling (CRITICAL):
   - ONLY use the exact topics listed in "Final Topics To Use".
   - DO NOT include, mention, or suggest ANY other DSA topics that are not in this list.
   - If only ONE topic is given, you MUST generate the roadmap using ONLY that topic for all ${duration} days, varying the concepts daily.

2. Smart Distribution Logic:
   - Do NOT use simple looping (e.g., Arrays -> Strings -> Linked List -> Arrays...).
   - Instead, group consecutive days for a single topic before moving to the next.
   - Divide ${duration} days across the topics smartly.
   - Assign more days to important topics (if they are present):
     * High Weight: Dynamic Programming, Graphs
     * Medium-High: Trees
     * Medium: Arrays, Strings
     * Low-Medium: Others
   - If weak topics exist (not "None"), assign them extra days and prioritize them early.

3. Content Variation (No Repetition):
   - EACH DAY MUST BE UNIQUE.
   - Vary the 'concepts' and 'problem' every single day.
   - When dedicating multiple days to one topic, progress logically from basics to advanced patterns.
   - Avoid generic, repeated phrases like "Basic syntax" or "Standard practice problem".

4. STRICT JSON FORMAT:
Return EXACTLY a valid JSON array of ${duration} objects, with NO surrounding text and NO markdown code blocks.
[
  {
    "day": 1,
    "topic": "Arrays",
    "concepts": ["Prefix Sum", "Sliding Window"],
    "problem": "Maximum Subarray"
  }
]`;

    let generatedData = null;

    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        // 5. Parsing: Clean Gemini response & safely parse JSON
        let textResponse = response.text || "";
        let cleanedJson = textResponse.trim();
        
        if (cleanedJson.startsWith('\`\`\`json')) {
            cleanedJson = cleanedJson.substring(7, cleanedJson.length - 3).trim();
        } else if (cleanedJson.startsWith('\`\`\`')) {
            cleanedJson = cleanedJson.substring(3, cleanedJson.length - 3).trim();
        }
        
        generatedData = JSON.parse(cleanedJson);
        if (!Array.isArray(generatedData)) throw new Error("Parsed AI JSON is not an array");
      } catch (aiError) {
        console.error('AI Parsing Error or Generation Failed:', aiError.message);
        generatedData = null; // trigger fallback
      }
    }

    // 5. If parsing fails -> fallback to manual roadmap using smarter distribution
    if (!generatedData || generatedData.length === 0) {
      generatedData = [];
      const baseDays = Math.floor(duration / finalTopics.length);
      let remainder = duration % finalTopics.length;
      let dayCount = 1;
      
      for (const topic of finalTopics) {
        let span = baseDays + (remainder > 0 ? 1 : 0);
        remainder--;
        for (let i = 0; i < span; i++) {
          generatedData.push({
            day: dayCount,
            topic: topic,
            concepts: [`${topic} Fundamentals Part ${i + 1}`, `Advanced ${topic} Concepts ${i + 1}`],
            problem: `${topic} Practice Problem ${i + 1}`
          });
          dayCount++;
        }
      }
    }

  // 6. Output to frontend -> mapped specifically to required structure
    const roadmap = generatedData.map((d, index) => ({
      day: d.day || index + 1,
      dayPart: `Day ${d.day || index + 1}`,
      topic: d.topic || 'DSA Subject',
      concepts: d.concepts || ['Fundamentals'],
      problem: d.problem || 'Practice Problem',
      completed: false
    }));

    // 7. Save to DB
    const newRoadmap = await Roadmap.create({
      user: req.user ? req.user.id : null,
      duration,
      difficulty,
      topics: finalTopics,
      days: roadmap
    });

    return res.json({
      success: true,
      roadmap: newRoadmap
    });

  } catch (error) {
    console.error('Server error generating roadmap:', error);
    res.status(500).json({ success: false, error: 'Internal server error while building roadmap.' });
  }
};

exports.getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error('Error fetching roadmap:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
