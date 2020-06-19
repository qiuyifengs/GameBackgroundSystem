export default {
    path: '/account',
    title: '账号重要信息',
    icon: 'user',
    children: (pre => [
        {
            path: `${pre}base`,
            title: '账号重要信息',
            icon: 'user',
            children: [
                {
                    path: `${pre}base/user`,
                    title: '账号重要信息查询',
                }
            ],
        }
    ])('/account/')
}