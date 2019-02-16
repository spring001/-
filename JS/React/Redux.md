
### Redux
####核心概念
1.用一个对象来描述state，其他代码不能随意修改，只有通过发起一个Action

2.Action（一个普通的JavaScript对象）就像是描述发生了什么的指示器，最终为了吧state和action串起来，开发一些函数（reducer）

####三大原则
1.单一数据源

2.state是只读的，唯一改变state的方式是通过触发一个action，action是一个用于描述发生事件的普通对象

3.使用纯函数来执行修改（reducer），接受state和action 返回新的state

import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)

####Action
action 来描述“发生了什么”
store.dispatch() 将 action 传到 store。
####Reducer 纯函数
使用 reducers 来根据 action 更新 state 
只要传入参数相同，返回计算得到的下一个 state 就一定相同，没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。
`(previousState, action) => newState`
#### Store
createStore() 的第二个参数是可选的, 用于设置 state 初始状态
```
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers)

import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
`
let unsubscribe = store.subscribe(handleChange)
unsubscribe()
`

####数据流
严格的单向数据流是 Redux 架构的设计核心。

####搭配React
1.安装react-redux
`import { connect } from 'react-redux'`


###高级
####异步 Action
通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数
```
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)
store
  .dispatch(fetchPosts('reactjs'))
  .then(() => console.log(store.getState())
)
```
####异步数据流
1.当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象。
####Middleware
它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点
1.
```
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

```
2.我们可以写一个 applyMiddleware() 方法
```
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}
```
####服务端渲染
为每次请求创建全新的 Redux store 实例；
按需 dispatch 一些 action；
从 store 中取出 state；
把 state 一同返回给客户端。