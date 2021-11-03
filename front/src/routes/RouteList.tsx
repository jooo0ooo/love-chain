import Home from "@pages/home/Home";
import Signup from "@pages/signup/Signup";
import Signin from "@pages/signin/Signin"
import Anything from "@pages/theme/anything/Anything";
import LastWill from "@pages/theme/last_will/LastWill";
import Love from "@pages/theme/love/Love";
import Aboutus from "@pages/aboutus/Aboutus";
import Main from "@pages/main/Main";

export const routes = [{
    path: '/',
    component: Home
}, {
    path: '/main',
    component: Main
}, {
    path: '/theme/love',
    component: Love
}, {
    path: '/theme/last_will',
    component: LastWill
}, {
    path: '/theme/anything',
    component: Anything
}, {
    path: '/signin',
    component: Signin
}, {
    path: '/signup',
    component: Signup
}, {
    path: '/aboutus',
    component: Aboutus
}]