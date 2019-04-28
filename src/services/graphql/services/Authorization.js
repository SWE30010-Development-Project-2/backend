import { RESTDataSource } from "apollo-datasource-rest"

export default class Authorisation extends RESTDataSource {
    constructor() {
        super()

        this.baseURL = "https://api.github.com/"
    }

    async getRateLimit() {
        const { rate } = await this.get("rate_limit")

        return rate
    }
}
