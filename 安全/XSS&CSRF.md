###安全
####XSS 跨站脚本攻击
XSS 分为三种：反射型，存储型和 DOM-based

XSS 通过修改 HTML 节点或者执行 JS 代码来攻击网站。
1.反射性
指发生请求时，XSS代码出现在请求URL中，作为参数提交到服务器，服务器解析并响应。响应结果中包含XSS代码，最后浏览器解析并执行。（cookie获取）
2.存储性
将恶意代码存储到服务端
3.基于Dom

防御
1 .输入过滤：对一些关键字和特殊字符进行过滤或 URL、HTML 编码，"<>?"或"script，javascript"；
2. httpOnly js脚本将无法读取到 cookie 信息。
3. 白名单

####CSRF 跨站请求伪造
攻击者盗用了你的身份，以你的名义发送恶意请求 
![图片](https://ask.qcloudimg.com/http-save/yehe-2170887/42jy9nsxn5.jpeg)

防御
1.验证码
2.referer Check
利用HTTP头中的Referer判断请求来源是否合法
Referer首部包含了当前请求页面的来源页面的地址
缺点有兼容性问题
3.增加token