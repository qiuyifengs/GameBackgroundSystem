let casual = require('casual')

const roleMap = [
  {
    label: '超级管理员',
    value: 1
  },
  {
    label: '管理员',
    value: 2
  },
  {
    label: '操作员A',
    value: 3
  },
  {
    label: '操作员B',
    value: 4
  }
]

const menus = [
  {
    id: '1',
    icon: 'table',
    path: '/table',
    name: 'table',
    title: '表格页'
  },
  {
    id: '2',
    icon: 'dashboard',
    path: '/dashboard',
    name: 'dashboard',
    title: 'Dashboard',
    children: [
      {
        id: '21',
        icon: '',
        path: '/dashboard/analysis',
        name: 'analysis',
        title: '分析页'
      },
      {
        id: '22',
        icon: '',
        path: '/dashboard/monitor',
        name: 'monitor',
        title: '监控页'
      },
      {
        id: '23',
        icon: '',
        path: '/dashboard/v-charts',
        name: 'v-charts',
        title: 'v-charts'
      },
      {
        id: '24',
        icon: '',
        path: '/dashboard/track',
        name: 'track',
        title: '轨迹图'
      }
    ]
  },
  {
    id: '3',
    icon: 'stock',
    path: '/d3',
    name: 'd3',
    title: 'D3',
    children: [
      {
        id: '31',
        icon: '',
        path: '/d3/bar',
        name: 'bar',
        title: 'bar'
      }
    ]
  }
]

const nav = {
    "results": [
      {
        "gender": "female",
        "name": {
          "title": "Mrs",
          "first": "Loane",
          "last": "Jean"
        },
        "location": {
          "street": {
            "number": 6270,
            "name": "Rue des Cuirassiers"
          },
          "city": "Aulnay-sous-Bois",
          "state": "Charente-Maritime",
          "country": "France",
          "postcode": 86221,
          "coordinates": {
            "latitude": "-1.9595",
            "longitude": "89.9980"
          },
          "timezone": {
            "offset": "+4:30",
            "description": "Kabul"
          }
        },
        "email": "loane.jean@example.com",
        "login": {
          "uuid": "976aab12-d839-4513-bc27-fc3ebb160f35",
          "username": "heavyzebra799",
          "password": "bryan1",
          "salt": "GoLveopX",
          "md5": "444c95bb703150b55e6d20f2d4df7731",
          "sha1": "d93f6caebdba050573a6b1e1bf5659ea8c698fa8",
          "sha256": "522e9f8b7e799822b5d77b27e80ab386eef2f48a87dbcc338ba6c8aaf3718421"
        },
        "dob": {
          "date": "1956-08-11T20:12:47.923Z",
          "age": 63
        },
        "registered": {
          "date": "2017-09-08T00:33:47.442Z",
          "age": 2
        },
        "phone": "04-03-09-23-55",
        "cell": "06-52-24-15-04",
        "id": {
          "name": "INSEE",
          "value": "2NNaN61059743 17"
        },
        "picture": {
          "large": "https://randomuser.me/api/portraits/women/66.jpg",
          "medium": "https://randomuser.me/api/portraits/med/women/66.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/women/66.jpg"
        },
        "nat": "FR"
      }
    ],
    "info": {
      "seed": "1c37d4c24c780425",
      "results": 1,
      "page": 1,
      "version": "1.3"
    }
  }

// LTV 统计表
const mdd1_stat_ltv = [
  {
    id: 1,
    device_type: 0,
    reg_date: '2020-1-7',
    total_reg: 10000,
    total_pay: '12345.00',
    pay_lv: '70%',
    ltv1: '2020',
    ltv3: '2020',
    ltv7: '2020',
    ltv15: '2020',
    ltv30: '2020',
    ltv45: '2020',
    ltv60: '2020',
    ltv90: '2020',
    create_date: '2020-1-7'
  },
  {
    id: 2,
    device_type: 0,
    reg_date: '2020-1-7',
    total_reg: 10000,
    total_pay: '12345.00',
    pay_lv: '70%',
    ltv1: '2020',
    ltv3: '2020',
    ltv7: '2020',
    ltv15: '2020',
    ltv30: '2020',
    ltv45: '2020',
    ltv60: '2020',
    ltv90: '2020',
    create_date: '2020-1-7'
  }
]

// 每5分钟在线统计表
const mdd1_stat_online = [
  {
    id: 1,
    plateform_online: '123',
    record_date: '2019-12-30',
    hall_online: '122',
    gaming_online: '123',
    create_date: '2019-12-30'
  },
  {
    id: 2,
    plateform_online: '123',
    record_date: '2019-12-30',
    hall_online: '122',
    gaming_online: '123',
    create_date: '2019-12-30'
  }
]

// 注册来源统计表 
const mdd_stat_reg_source = [
  {
    id: 1,
    device_type: 0,
    reg_date: '2019-12-30',
    total_reg: '123',
    create_date: '2019-12-30'
  },
  {
    id: 2,
    device_type: 0,
    reg_date: '2019-12-30',
    total_reg: '123',
    create_date: '2019-12-30'
  }
]

// 用户留存统计表
const mdd1_stat_user_keep = [
  {
    id: 1,
    device_type: 0,
    reg_data: '2019-12-30',
    total_reg: '123',
    k2: 12.00,
    k3: 12.00,
    k4: 12.00,
    k5: 12.00,
    k6: 12.00,
    k7: 12.00,
    k8: 12.00,
    k9: 12.00,
    k10: 12.00,
    k11: 12.00,
    k12: 12.00,
    k13: 12.00,
    k14: 12.00,
    k15: 12.00,
    k16: 12.00,
    k17: 12.00,
    k18: 12.00,
    k19: 12.00,
    k20: 12.00,
    k21: 12.00,
    k22: 12.00,
    k23: 12.00,
    k24: 12.00,
    k25: 12.00,
    k26: 12.00,
    k27: 12.00,
    k28: 12.00,
    k29: 12.00,
    k30: 12.00,
    create_date: '2019-12-30'
  }
]

// 转化率统计表 
const mdd1_stat_login_conversion = [
  {
    id: 1,
    device_type: 0,
    reg_data: '2019-12-30',
    total_reg: '121',
    page_id: '12'
  }
]

// 充值概况
const mdd1_stat_recharge_overview = []

// 充值订单详情
const mdd1_stat_recharge_detail = []

// 月度数据统计表
const mdd1_stat_monthly_data = []

// 首充登记分布
const mdd1_stat_first_pay_level = []

// 各段充值金额比（单笔）
const mdd1_stat_recharge_amount_ratio = []

for (let i = 1; i < 10; i++) {

  mdd1_stat_first_pay_level.push({
    id: i,
    device_type: 0,
    level: 1,
    total: 12333,
    create_date: '2019-12-30'
  })

  mdd1_stat_recharge_amount_ratio.push({
    id: i,
    stage_recharge: '0-99元',
    recharge_price: '123',
    ratio: '70'
  })

  // mdd1_stat_monthly_data.push({
  //   id: i,
  //   total_recharge: '12.00',
  //   record_month: '201909',
  //   create_date: '2019-12-30',
  //   total_reg: '12',
  //   total_login: '12',
  //   total_recharge_people: '12',
  //   pay_lv: '12',
  //   arpu: '12',
  //   max_online: 1,
  //   avg_online: 1,
  //   produce_coin: 1,
  //   cost_coin: 1,
  //   product_secret_book: 1,
  //   cost_secret_book: 1
  // })

  mdd1_stat_recharge_overview.push({
    id: i,
    total_recharge: '123',
    record_date: '2019-12-30',
    total_recharge_people: '12',
    max_online: '12',
    avg_online: '12',
    device_type: 0,
    pay_arpu: '12',
    active_arpu: '12',
    create_date: '2019-12-30'
  })

  mdd1_stat_recharge_detail.push({
    id: i,
    orderno: 145343434,
    reg_account: 'qwer',
    reg_price: '1213',
    reg_time: '2019-12-30',
    yuanbao: 23,
    pay_type: 0
  })
}

// 充值统计表(每小时)
const mdd1_stat_hourly_recharge = [
  {
    id: 1,

  }
]

casual.define('user', function (role) {
  return {
    id: casual.card_number(),
    username: casual.username,
    contacts: casual.full_name,
    contactsEmail: casual.email,
    address: casual.address,
    roleId: role.value,
    status: casual.integer(0, 1),
    createTime: casual.unix_time,
    updateTime: casual.unix_time
  }
})

module.exports = () => {
  const data = {
    users: [],
    roles: roleMap,
    login: {
      status: 200,
      code: 0,
      data: {
        token: '8dfhassad0asdjwoeiruty',
        menus: menus,
        uuid: 'admin-uuid',
        name: 'Admin',
        user: casual.user(casual.random_element(roleMap))
      },
      msg: 'success'
    },
    logout: {
      status: 200,
      message: 'success'
    },
    menuNav: {
        status: 200,
        data: nav,
        message: 'success'
    },
    mdd1_stat_ltv: {
      status: 200,
      data: mdd1_stat_ltv,
      message: 'success'
    },
    mdd1_stat_online: {
      status: 200,
      data: mdd1_stat_online,
      message: 'success'
    },
    mdd_stat_reg_source: {
      status: 200,
      data: mdd_stat_reg_source,
      message: 'success'
    },
    mdd1_stat_user_keep: {
      status: 200,
      data: mdd1_stat_user_keep,
      message: 'success'
    },
    mdd1_stat_login_conversion: {
      status: 200,
      data: mdd1_stat_login_conversion,
      message: 'success'
    },
    mdd1_stat_recharge_overview: {
      status: 200,
      data: {
        pageSize: 10,
        pageNo: 1,
        totalCount: 50,
        totalPage: 10,
        data: mdd1_stat_recharge_overview
      },
      message: 'success'
    },
    mdd1_stat_recharge_detail: {
      status: 200,
      data: {
        pageSize: 10,
        pageNo: 1,
        totalCount: 50,
        totalPage: 10,
        data: mdd1_stat_recharge_detail
      },
      message: 'success'
    }, 
    mdd1_stat_monthly_data: {
      status: 200,
      data: {
        pageSize: 10,
        pageNo: 1,
        totalCount: 50,
        totalPage: 10,
        data: mdd1_stat_monthly_data
      },
      message: 'success'
    }, 
    mdd1_stat_recharge_amount_ratio: {
      status: 200,
      data: {
        pageSize: 10,
        pageNo: 1,
        totalCount: 50,
        totalPage: 10,
        data: mdd1_stat_recharge_amount_ratio
      },
      message: 'success'
    },
    mdd1_stat_first_pay_level: {
      status: 200,
      data: {
        pageSize: 10,
        pageNo: 1,
        totalCount: 50,
        totalPage: 10,
        data: mdd1_stat_first_pay_level
      },
      message: 'success'
    }
  }

  for (let i = 0; i < 54; i++) {
    data.users.push(casual.user(casual.random_element(roleMap)))
  }

  return data
}
