import { commonPatterns, secretPatterns, PatternResult } from "../db/patterns"


class Parser {
	#body: string

	constructor(body: string) {
		this.#body = body
	}


	#extractByPattern(pattern: string): Set<string> {
		return new Set(this.#body.match(new RegExp(commonPatterns?.get(pattern)?.regex || "", "g")) || [])

	}

	get ipAddresses(): Set<string> {
		return this.#extractByPattern("ip-address")
	}

	get emails(): Set<string> {
		return this.#extractByPattern('email')
	}

	get urls(): Set<string> {
		return this.#extractByPattern("url")
	}

	get phoneNumbers(): Set<string> {
		return this.#extractByPattern("phone-number")
	}

	get creditCards(): Set<string> {
		return this.#extractByPattern("credit-card")
	}

	get topSecrets(): Set<PatternResult> {
		const topSecretsTypes = ["auth0_api_clientsecret", "github_api_key", "json_web1_token", "oauth_token", "firebase_token", "firebase_api_token", "auth0_client_secret", "Bearer token", "basic_auth_credentials"]
		const result: Set<PatternResult> = new Set()
		topSecretsTypes.forEach((name) => {
			const pattern = secretPatterns?.get(name)
			if (pattern) {
				const matches = this.#body.match(new RegExp(pattern.regex || '', 'g'))
				matches?.forEach((value) => result.add({ name, value, confidence: pattern.confidence }))
			}
		}
		)
		return result
	}


	get secrets(): Set<PatternResult> {
		const result: Set<PatternResult> = new Set()
		secretPatterns?.forEach((pattern, key) => {
			const matches = this.#body.match(new RegExp(pattern.regex, 'g'))
			matches?.forEach((value) => result.add({
				name: key, value, confidence: pattern.confidence,

			}))
		})
		return result
	}

}

export default Parser
