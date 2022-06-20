import request from '@/utils/request'

export const reqSkuList = (page, limit) => {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get'
    })
}

export const reqSale = (skuId) => {
    return request({
        url: `/admin/product/onSale/${skuId}`,
        method: 'get'
    })
}

export const reqCancel = (skuId) => {
    return request({
        url: `/admin/product/cancelSale/${skuId}`,
        method: 'get'
    })
}

export const reqSkuById = (skuId) => {
    return request({
        url: `/admin/product/getSkuById/${skuId}`,
        method: 'get'
    })
}