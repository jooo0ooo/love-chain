import Home from "@pages/home/Home";
import Anything from "@pages/theme/anything/Anything";
import LastWill from "@pages/theme/last_will/LastWill";
import Love from "@pages/theme/love/Love";
import Theme from "@pages/theme/Theme";

export const routes = [{
    path: '/',
    component: Home
}, {
    path: '/theme/choose',
    component: Theme
}, {
    path: '/theme/love',
    component: Love
}, {
    path: '/last_will',
    component: LastWill
}, {
    path: '/anything',
    component: Anything
}]