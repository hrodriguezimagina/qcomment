
export default {
  priorities: {
    permission: 'itask.priorities.manage',
    activated: true,
    authenticated: true,
    path: '/task/priorities/index',
    name: 'qtask.admin.prioritiesy',
    crud : import('modules/qtask/_crud/priorities'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'itask.cms.sidebar.adminPriorities',
    icon: 'fa-light fa-diamond-exclamation',
    subHeader: {
        refresh: true,
    }
  },
  categories: {
    permission: 'itask.categories.manage',    
    activated: true,
    authenticated: true,
    path: '/task/categories/index',
    name: 'qtask.admin.categories',
    crud : import('modules/qtask/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'itask.cms.sidebar.adminCategories',
    icon: 'fa-light fa-tags',
    subHeader: {
        refresh: true,
    }
  },
  statuses: {
    permission: 'itask.statuses.manage',
    activated: true,
    authenticated: true,
    path: '/task/statuses/index',
    name: 'qtask.admin.statuses',
    crud : import('modules/qtask/_crud/statuses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'itask.cms.sidebar.adminStatuses',
    icon: 'fa-light fa-flag',
    subHeader: {
        refresh: true,
    }
  },  
  tasksList: {
    permission: 'itask.tasks.manage',
    activated: true,
    authenticated: true,
    path: '/task/tasksList/index',
    name: 'qtask.admin.tasksList',
    //crud : import('modules/qtask/_crud/tasks'),
    page: () => import('modules/qtask/_pages/tasksList'),
    layout: () => import('layouts/master.vue'),
    title: 'itask.cms.sidebar.adminTasks',
    icon: 'fa-light fa-clipboard-check',
    subHeader: {
        refresh: true,
    }
  },
}
