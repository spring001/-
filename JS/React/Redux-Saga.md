### redux-saga
redux-saga 是一个 redux 中间件
redux-saga  使用Generator 函数实现，让异步的流程更易于读取，写入和测试
1.createSagaMiddleware 工厂函数来创建一个 Saga middleware。
2.applyMiddleware 将 middleware 连接至 Store
3.sagaMiddleware.run(helloSaga) 运行 Saga

####基础
#####辅助函数
1.takeEvery  允许多个fetchData实例同时启动
takeEvery 是一个使用 take 和 fork 构建的高级 API
```
const takeEvery = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel)
    yield fork(saga, ...args.concat(action))
  }
})
```
2.takeLatest 只允许一个fetchData任务执行，最后被启动的那个，之前的任务都会被取消
```
const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
  let lastTask
  while (true) {
    const action = yield take(patternOrChannel)
    if (lastTask) {
      yield cancel(lastTask) // 如果任务已经结束，cancel 则是空操作
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})
```
3.takeLeading 保持以第一个 action 运行
```
const takeLeading = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
})
```
4.

####声明式 Effects
从Generator里yield纯JavaScript对象来表达逻辑。称这些对象为effect。
####Effects 创建器
1.call 创建一个 Effect 描述信息，用来命令 middleware 以参数 args 调用函数 fn
`import { call } from 'redux-saga/effects'`
`const products = yield call(Api.fetch, '/products')`
2.put 创建一个 Effect 描述信息，用来命令 middleware 向 Store 发起一个 action
3.take  创建一个 Effect 描述信息,用来命令 middleware 在 Store 上等待指定的 action
` const action = yield take(pattern)`
在发起与 pattern 匹配的 action 之前，Generator 将暂停。
在 take 的情况中，它将会暂停 Generator 直到一个匹配的 action 被发起了。 
```
//登录流程
function* loginFlow() {
  while(true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}
```
4.fork 用来命令 middleware 以 非阻塞调用 的形式执行 fn
5.cancel 取消 fork 任务
一旦任务被 fork，可以使用 yield cancel(task) 来中止任务执行。取消正在运行的任务
6.cancelled 
```
import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
```
####Effects 组合器
7.race
8.all


错误处理 try/catch
```
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```



  
####名词
1.Effect 一个 Plain Object JavaScript 对象，包含一些将被 saga middleware 执行的指令

2.Task
一个 task 就像是一个在后台运行的进程。通过 fork 函数来创建 task。

3.阻塞调用/非阻塞调用
阻塞：take , call, ,
非阻塞：fork，  cancel，put


####Api