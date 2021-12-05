/* eslint-disable */
import {Module} from "vuex"
import {GlobalDataProps} from "./index"
import {v4 as uuidv4} from "uuid"
import {AllComponentProps, TextComponentProps} from "@/defaultProps"

// 整个编辑器的元素
export interface EditorProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[];
    // 一系列和其他状态相关的信息，应该有很多
    // 当前编辑的是哪个元素，uuid
    currentElement: string;
}

// export type AllFormProps = PageProps & AllComponentProps
export interface ComponentData {
    // 每个元素 props 所有属性
    // 我们上节课已经分析过了，是 css 属性和其他属性的混合体
    // 并且我们会把这些属性完全平铺开来，其实在编辑器分析过后，你就能更感受到平铺的一个好处
    props: { [key: string]: any };
    // id，uuid v4 生成
    id: string;
    // 业务组件库名称 l-text，l-image 等等
    name: string;
}

export interface PageProps {
    backgroundColor: string;
    backgroundImage: string;
    backgroundRepeat: string;
    backgroundSize: string;
    height: string;
}

export type AllFormProps = PageProps & AllComponentProps


// 测试数据
export const testComponents: ComponentData[] = [
    {
        id: uuidv4(),
        name: 'l-text',
        props: {
            text: 'hello',
            fontSize: '20px',
            color: '#000000',
            'lineHeight': '1',
            textAlign: 'left',
            fontFamily: '',
            width: '100px',
            height: '100px',
            backgroundColor: '#efefef'
        }
    },
    {
        id: "123",
        name: 'l-text',
        props: {text: "hello world1", fontSize: '20px', color: "red", fontFamily: '"SimSun","STSong"'}
    },
    {id: uuidv4(), name: 'l-text', props: {text: "hello world2", fontSize: '10px'}},
    {id: uuidv4(), name: 'l-text', props: {text: "hello world3", fontSize: '16px'}},
]


const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponents,
        // 当前点击元素的id
        currentElement: "123"
    },

    mutations: {
        // 添加组件
        addComponent(state, props) {
            console.log("addComponentProps", props)
            state.components.push(props)
        },
        setActive(state, currentID) {
            state.currentElement = currentID
        },
        updateComponent(state, {key, value}) {
            // 找当前点击元素
            const currentComponent = state.components.find((component) => {
                // 更具id查找
                return component.id === state.currentElement
            })
            if (currentComponent) {
                currentComponent.props[key as keyof TextComponentProps] = value
            }

        }
    },
    // 计算属性
    getters: {
        // 获取当前在画布中点击的元素
        getCurrentElement: (state) => {
            return state.components.find((component) => {
                // 更具id查找
                return component.id === state.currentElement
            })
        }
    }
}


export default editor


