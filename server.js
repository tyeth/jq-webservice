// Now available at:
// https://jq.gdenu.fi

require("dotenv").config();
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const jq = require("jq-web");

const app = express();
const PORT = 5000;

// Middleware to check API key
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  // For now, only accept 'DEMO' as valid API key
  if (apiKey !== "DEMO") {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
};

app.get("/filter", authenticateApiKey, async (req, res) => {
  try {
    const { url, jqQuery, ignoredFields, sort } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Fetch JSON from provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch from URL: ${response.statusText}`,
      });
    }

    const jsonData = await response.json();
    let result = jsonData;

    // Apply jq filter if provided
    if (jqQuery) {
      try {
        result = await jq.then((jq) => jq.json(jsonData, jqQuery));
      } catch (error) {
        return res.status(400).json({
          error: "Invalid jq query or filtering error",
          details: error.message,
        });
      }
    }
    // Remove ignored fields if specified
    else if (ignoredFields) {
      const fields = ignoredFields.split(",").map((f) => f.trim());
      const removeFields = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map((item) => removeFields(item));
        }
        if (typeof obj === "object" && obj !== null) {
          const newObj = { ...obj };
          fields.forEach((field) => delete newObj[field]);
          return newObj;
        }
        return obj;
      };
      result = removeFields(result);
    }

    if (sort) {
      // Send JSON result with sorted keys and no whitespace
      const sortKeysDeep = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map(sortKeysDeep);
        } else if (obj !== null && typeof obj === "object") {
          return Object.keys(obj)
            .sort()
            .reduce((acc, key) => {
              acc[key] = sortKeysDeep(obj[key]);
              return acc;
            }, {});
        }
        return obj;
      };

      const sortedJson = //JSON.stringify(result);
        JSON.stringify(sortKeysDeep(result));
      res.type("application/json").send(sortedJson);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error occurred while processing the request",
    });
  }
});

app.get("/", (req, res) => {
  res.send(
    'Hello! Try using <a href="/filter?apiKey=DEMO&url=https://jsonplaceholder.typicode.com/posts/1&jqQuery=.">/filter</a> <br/><br/><br/><hr /><br/><h4>Alternatively use the form:</h4> <form action=/filter>URL: <input name="url" value="https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json" /><br/><hr /> <span><i>Either:</i></span><br/>Ignored Fields (comma separated):<input name="ignoredFields" /><br/><br/> <span><i>Or:</i></span><br/> jq filter: [<a href="https://jqlang.org/tutorial/">help</a>]<input name="jqQuery" /><br/><br/>Sort Keys: <input type="checkbox" name="sort" checked value="true" /><br/><br/>API Key: <input name="apiKey" value="DEMO" /><br/><br/> <input type="submit" /></form><br/><br/><hr/><br/><br/>Todo:<br/>Add Sort keys option (&sort=1)<br/>Add custom request headers option (&amp;header=blah:blah)',
  );
});

app.get("/test", (req, res) => {
  res.redirect(
    "/filter?apiKey=DEMO&url=https://api.nytimes.com/svc/topstories/v2/home.json%3Fapi-key=anogZKYjTAU323PbqZCVsAdFduKSkuq1&jqQuery={results:%20(.results%20|%20map({title}))}",
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
