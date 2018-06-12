import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login'
import Index from '@/pages/index'
import UserSettingPage from '@/pages/UserSettingPage'
import UniqueSettingPage from '@/pages/UniqueSettingPage'
import WellcomePage from '@/pages/WellcomePage'
import AddCoursePage from '@/pages/AddCoursePage'
import AddTemplatePage from '@/pages/AddTemplatePage'
import ListCoursePage from '@/pages/ListCoursePage'
import ManageCoursePage from '@/pages/ManageCoursePage'
import ListTemplatePage from '@/pages/ListTemplatePage'
import ListReportPage from '@/pages/ListReportPage'
import CourseInfoPage from '@/pages/CourseInfoPage'
import LikedCoursePage from '@/pages/LikedCoursePage'
import NeedReportPage from '@/pages/NeedReportPage'
import CoursePrePage from '@/pages/CoursePrePage'
import ReportPage from '@/pages/ReportPage'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '/userSetting', name: 'userSetting', component: UserSettingPage },
        { path: '/uniqueSetting', name: 'uniqueSetting', component: UniqueSettingPage },
        { path: '/wellcome', name: 'wellcome', component: WellcomePage },
        { path: '/addCourse', name: 'addCourse', component: AddCoursePage },
        { path: '/addTemplate', name: 'addTemplate', component: AddTemplatePage},
        { path: '/listCourse', name: 'listCourse', component: ListCoursePage, children:[]},
        { path: '/manageCourse', name: 'manageCourse', component: ManageCoursePage },
        { path: '/listTemplate', name: 'listTemplate', component: ListTemplatePage},
        { path: '/listReport', name: 'listReport', component: ListReportPage},
        { path: '/courseInfo', name: 'courseInfo', component: CourseInfoPage},
        { path: '/likedCourse', name: 'likedCourse', component: LikedCoursePage},
        { path: '/needReport', name: 'needReport', component: NeedReportPage},
        { path: '/coursePre', name: 'coursePre', component: CoursePrePage},
        { path: '/report', name: 'report', component: ReportPage},

      ]
    },
  ]
})
