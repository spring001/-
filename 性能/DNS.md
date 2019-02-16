##DNS
通过域名，最终得到该域名对应的IP地址的过程叫做域名解析
1. .根域 
域名“www.baidu.com.” 最后的“.”一般被省略了
根域有13个IP地址，利用任播技术架设镜像服务器，使得根域名服务器数量大于13台。
2. 域的划分
根域->顶级域（一级域）
baidu.com 就是一个顶级域名，对了有域名服务器，www.baidu.com 却不是顶级域名 是baidu.com这个域里叫www的主机

一级域之后还有二级域，三级域，只要我买了一个顶级域，并且我搭建了自己BIND服务器（或者其他软件搭建的）注册到互联网中，那么我就可以随意在前面多加几个域了（当然长度是有限制的）。

比如a.www.baidu.com，在这个网址中，www.baidu.com变成了一个二级域而不是一台主机，主机名是a。

3. 域名服务器
能提供域名解析的服务器，上面的记录类型可以是A(address)记录，NS记录（name server），MX（mail），CNAME等
A记录是什么意思呢，就是记录一个IP地址和一个主机名字，比如我这个域名服务器所在的域test.baidu.com，我们知道这是一个二级的域名，然后我在里面有一条A记录,记录了主机为a的IP，查到了就返回给你了。
如果我现在要想baidu.com这个域名服务器查询a.test.baidu.com，那么这个顶级域名服务器就会发现你请求的这个网址在test.baidu.com这个域中，我这里记录了这个二级域的域名服务器test.baidu.com的NS的IP。我返回给你这个地址你再去查主机为a的主机把。
4. 解析过程
①本机向local dns请求www.baidu.com
②local dns向根域请求www.baidu.com，根域返回com.域的服务器IP
③向com.域请求www.baidu.com，com.域返回baidu.com域的服务器IP
④向baidu.com请求www.baidu.com，返回cname www.a.shifen.com和a.shifen.com域的服务器IP
⑤向root域请求www.a.shifen.com
⑥向com.域请求www.a.shife.com
⑦向shifen.com请求
⑧向a.shifen.com域请求
⑨拿到www.a.shifen.com的IP
⑩localdns返回本机www.baidu.com cname www.a.shifen.com 以及 www.a.shifen.com的IP

 
