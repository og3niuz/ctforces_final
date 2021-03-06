import Index from '@/views/Index/Index/Index';
import Login from '@/views/Index/Login/Index';
import Register from '@/views/Index/Register/Index';

import TaskList from '@/views/Tasks/List/Index';
import TaskIndex from '@/views/Tasks/Index/Index';
import TaskCreate from '@/views/Tasks/Create/Index';
import TaskEdit from '@/views/Tasks/Edit/Index';
import TaskSolved from '@/views/Tasks/Solved/Index';

import ContestCreate from '@/views/Contests/Create/Index';
import ContestEdit from '@/views/Contests/Edit/Index';
import ContestIndex from '@/views/Contests/Index/Index';
import ContestTasks from '@/views/Contests/Index/Index/Index';
import ContestScoreboard from '@/views/Contests/Index/Scoreboard/Index';
import ContestTask from '@/views/Contests/Index/Task/Index/Index';
import ContestTaskSolved from '@/views/Contests/Index/Task/Solved/Index';
import ContestList from '@/views/Contests/List/Index';
import ContestRegister from '@/views/Contests/Register/Index';

import Rating from '@/views/Users/Rating/Index';
import Upsolving from '@/views/Users/Upsolving/Index';

import Profile from '@/views/Users/Profile/Index';
import ProfileMain from '@/views/Users/Profile/Index/Index';
import ProfileSettings from '@/views/Users/Profile/Settings/Index';
import ProfileBlog from '@/views/Users/Profile/Blog/Index';
import ProfileTeams from '@/views/Users/Profile/Teams/Index';

import PostIndex from '@/views/Posts/Index/Index';
import PostCreate from '@/views/Posts/Create/Index';
import PostEdit from '@/views/Posts/Edit/Index';

import TeamCreate from '@/views/Teams/Create/Index';
import TeamJoin from '@/views/Teams/Join/Index';
import TeamIndex from '@/views/Teams/Index/Index';

import ConfirmEmail from '@/views/Index/ConfirmEmail/Index';
import PasswordReset from '@/views/Index/PasswordReset/Index';
import PasswordResetConfirm from '@/views/Index/PasswordResetConfirm/Index';
import EmailResend from '@/views/Index/EmailResend/Index';

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/confirm_email',
        name: 'email_confirm',
        component: ConfirmEmail,
    },
    {
        path: '/reset_password',
        name: 'password_reset',
        component: PasswordReset,
    },
    {
        path: '/reset_password_confirm',
        name: 'password_reset_confirm',
        component: PasswordResetConfirm,
    },
    {
        path: '/email_resend',
        name: 'email_resend',
        component: EmailResend,
    },
    {
        path: '/teams/create',
        name: 'team_create',
        component: TeamCreate,
        meta: {
            auth: true,
        },
    },
    {
        path: '/teams/:id/join',
        name: 'team_join',
        component: TeamJoin,
        meta: {
            auth: true,
        },
    },
    {
        path: '/teams/:id',
        name: 'team_index',
        component: TeamIndex,
    },
    {
        path: '/tasks',
        name: 'task_list',
        component: TaskList,
    },
    {
        path: '/tasks/create',
        name: 'task_create',
        component: TaskCreate,
        meta: {
            auth: true,
        },
    },
    {
        path: '/tasks/:id/edit',
        name: 'task_edit',
        component: TaskEdit,
        meta: {
            auth: true,
        },
    },
    {
        path: '/tasks/:id/solved',
        name: 'task_solved',
        component: TaskSolved,
    },
    {
        path: '/tasks/:id',
        name: 'task_index',
        component: TaskIndex,
    },
    {
        path: '/contests/create',
        name: 'contest_create',
        component: ContestCreate,
        meta: {
            auth: true,
        },
    },
    {
        path: '/contests/:id/edit',
        name: 'contest_edit',
        component: ContestEdit,
        meta: {
            auth: true,
        },
    },
    {
        name: 'contest_register',
        path: '/contests/:id/register',
        component: ContestRegister,
        meta: {
            auth: true,
        },
    },
    {
        name: 'contest_scoreboard',
        path: '/contests/:id/scoreboard',
        component: ContestScoreboard,
    },
    {
        path: '/contests/:id',
        component: ContestIndex,

        children: [
            {
                name: 'contest_task_solved',
                path: 'task/:task_id/solved',
                component: ContestTaskSolved,
            },
            {
                name: 'contest_task',
                path: 'task/:task_id',
                component: ContestTask,
            },
            {
                name: 'contest_tasks',
                path: '',
                component: ContestTasks,
            },
        ],
    },
    {
        path: '/contests',
        name: 'contest_list',
        component: ContestList,
    },
    {
        path: '/rating',
        name: 'rating',
        component: Rating,
    },
    {
        path: '/upsolving',
        name: 'upsolving',
        component: Upsolving,
    },
    {
        path: '/users/:username',
        component: Profile,

        children: [
            {
                name: 'profile',
                path: '',
                component: ProfileMain,
            },
            {
                name: 'settings',
                path: 'settings',
                component: ProfileSettings,
                meta: {
                    auth: true,
                },
            },
            {
                name: 'blog',
                path: 'blog',
                component: ProfileBlog,
            },
            {
                name: 'teams',
                path: 'teams',
                component: ProfileTeams,
            },
        ],
    },
    {
        path: '/posts/create',
        name: 'post_create',
        component: PostCreate,
        meta: {
            auth: true,
        },
    },
    {
        path: '/posts/:id/edit',
        name: 'post_edit',
        component: PostEdit,
        meta: {
            auth: true,
        },
    },
    {
        path: '/posts/:id',
        name: 'post_index',
        component: PostIndex,
    },
];

export default routes;
