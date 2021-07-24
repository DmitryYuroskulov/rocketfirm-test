import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { ApiRepository } from '~/repository/api.repository'

export default function (context: Context, inject: Inject) {
    const apiRepository = new ApiRepository()
    inject('apiRepository', apiRepository)
}
