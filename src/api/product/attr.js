import request from '@/utils/request';

export const reqCategory1List = () => {
    return request({
        url: '/admin/product/getCategory1',
        method: 'get'
    })
}

export const reqCategory2List = (category1id) => {
    return request({
        url: `/admin/product/getCategory2/${category1id}`,
        method: 'get'
    })
}

export const reqCategory3List = (category2id) => {
    return request({
        url: `/admin/product/getCategory3/${category2id}`,
        method: 'get'
    })
}

export const reqAttrList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
}

export const reqAddOrUpdateAttr = (data) => {
    return request({
        url: '/admin/product/saveAttrInfo',
        method: 'post',
        data
    })
}