import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { DataModel } from "./_generated/dataModel"

export default Anonymous<DataModel>({
    id
    profile(params, ctx) {
        return {
            username: params.username as string
        }
    }
})
