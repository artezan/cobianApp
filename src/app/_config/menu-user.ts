export const adminNav = [
    {
        id      : 'admin',
        title   : 'Admin',
        type    : 'group',
        icon    : 'apps',
        children: [
            {
                id   : 'users',
                title: 'Users',
                type : 'item',
                icon : 'person',
                url  : '/apps/dashboards/analytics'
            },
            {
                id   : 'payments',
                title: 'Payments',
                type : 'item',
                icon : 'attach_money',
                url  : '/apps/academy'
            }
        ]
    },
    {
        id      : 'control-panel',
        title   : 'Control Panel',
        type    : 'group',
        icon    : 'apps',
        children: [
            {
                id   : 'cron-jobs',
                title: 'Cron Jobs',
                type : 'item',
                icon : 'settings',
                url  : '/apps/file-manager'
            },
            {
                id   : 'maintenance-mode',
                title: 'Maintenance Mode',
                type : 'item',
                icon : 'build',
                url  : '/apps/todo'
            }
        ]
    }
];

