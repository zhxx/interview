import Vue from 'vue'
import { Button, Form, FormItem, Input, Carousel, CarouselItem, Rate, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Rate)


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;