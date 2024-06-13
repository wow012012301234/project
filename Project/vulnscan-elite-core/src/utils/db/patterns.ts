import fs from "fs"
import path from "path"
import { databasePath } from "."


type Confidence = "high" | "low" | "meduim"

export type Pattern = {
	regex: string,
	confidence: Confidence
}

export type PatternResult = {
    name:string,
	value: string,
	confidence: Confidence
}


function getPatterns(file: string): Map<string, Pattern> | null {
	try {
		const data = fs.readFileSync(path.join(databasePath, "patterns", file), "utf8");
		return new Map(Object.entries(JSON.parse(data)))

	}
	catch (err) {
		return null
	}
}

export const commonPatterns = getPatterns("common-regex-db.json")
export const secretPatterns = getPatterns("secret-regex-db.json")


