import {defineComponent} from 'vue'

const RenderVnode = defineComponent({
    // 接受一个vnode的属性
    props: {
        vNode: {
            type: [Object, String],
            required: true
        }
    },
    render() {
        // 把vnode返回出去
        return this.vNode
    }
})

export default RenderVnode
