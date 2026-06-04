import{_ as s,o as n,c as e,a0 as l}from"./chunks/framework.CNDWyMYS.js";const u=JSON.parse('{"title":"Creating a Makefile that plays nice with LuaRocks","description":"","frontmatter":{},"headers":[],"relativePath":"creating_a_makefile_that_plays_nice_with_luarocks.md","filePath":"creating_a_makefile_that_plays_nice_with_luarocks.md"}'),p={name:"creating_a_makefile_that_plays_nice_with_luarocks.md"};function t(i,a,o,c,r,h){return n(),e("div",null,[...a[0]||(a[0]=[l(`<h1 id="creating-a-makefile-that-plays-nice-with-luarocks" tabindex="-1">Creating a Makefile that plays nice with LuaRocks <a class="header-anchor" href="#creating-a-makefile-that-plays-nice-with-luarocks" aria-label="Permalink to &quot;Creating a Makefile that plays nice with LuaRocks&quot;">​</a></h1><p>The page about <a href="./recommended_practices_for_makefiles.html">Recommended practices for Makefiles</a> mentions what you should do in order to create a Makefile that LuaRocks can work with. What it does not do is to explain how to interact between your rockspec and the Makefile so that your rock will install in a way such that LuaRocks knows everything it needs to know to handle everything after the installation (like, for example, removal).</p><p>LuaRocks creates a few very important variables for you, that you can pass to your Makefile. They come in 2 varieties, one set for building the module and another set for installing it. The variables are:</p><p>For building:</p><ul><li><code>CFLAGS</code> - flags for the C compiler</li><li><code>LIBFLAG</code> - the flags needed for the linker to create shared libraries</li><li><code>LUA_LIBDIR</code> - where to find the Lua libraries</li><li><code>LUA_BINDIR</code> - where to find the Lua binary</li><li><code>LUA_INCDIR</code> - where to find the Lua headers</li><li><code>LUALIB</code> - the name of the Lua library. This is not available nor needed on all platforms.</li><li><code>LUA</code> - the name of the Lua interpreter</li><li><code>LUA_VERSION</code> - the version of Lua</li></ul><p>For installing:</p><ul><li><code>PREFIX</code> - basic installation prefix for the module</li><li><code>BINDIR</code> - where to put user callable programs or scripts</li><li><code>LIBDIR</code> - where to put the shared libraries implementing modules</li><li><code>LUADIR</code> - where to put the Lua scripts implementing modules</li><li><code>CONFDIR</code> - where to put your modules configuration</li></ul><p>Most of these variables point immediately where you&#39;d expect them to, but <code>BINDIR</code>, <code>LIBDIR</code> and <code>LUADIR</code> are special. These point to a location where you need to put the files in order for LuaRocks to move them to their final destination. If you install your stuff here, then LuaRocks will know what files your module installed and can later remove them.</p><p>These variables are not readily available in the Makefile, you need to tell LuaRocks to pass them to make. A simple rockspec that will do this looks like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>package = &quot;lrtest&quot;</span></span>
<span class="line"><span>version = &quot;1.0-1&quot;</span></span>
<span class="line"><span>source = {</span></span>
<span class="line"><span>   url = &quot;http://...&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>build = {</span></span>
<span class="line"><span>   type = &quot;make&quot;,</span></span>
<span class="line"><span>   build_variables = {</span></span>
<span class="line"><span>      CFLAGS=&quot;$(CFLAGS)&quot;,</span></span>
<span class="line"><span>      LIBFLAG=&quot;$(LIBFLAG)&quot;,</span></span>
<span class="line"><span>      LUA_LIBDIR=&quot;$(LUA_LIBDIR)&quot;,</span></span>
<span class="line"><span>      LUA_BINDIR=&quot;$(LUA_BINDIR)&quot;,</span></span>
<span class="line"><span>      LUA_INCDIR=&quot;$(LUA_INCDIR)&quot;,</span></span>
<span class="line"><span>      LUA=&quot;$(LUA)&quot;,</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   install_variables = {</span></span>
<span class="line"><span>      INST_PREFIX=&quot;$(PREFIX)&quot;,</span></span>
<span class="line"><span>      INST_BINDIR=&quot;$(BINDIR)&quot;,</span></span>
<span class="line"><span>      INST_LIBDIR=&quot;$(LIBDIR)&quot;,</span></span>
<span class="line"><span>      INST_LUADIR=&quot;$(LUADIR)&quot;,</span></span>
<span class="line"><span>      INST_CONFDIR=&quot;$(CONFDIR)&quot;,</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The corresponding Makefile looks like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>all:</span></span>
<span class="line"><span>	@echo --- build</span></span>
<span class="line"><span>	@echo CFLAGS: $(CFLAGS)</span></span>
<span class="line"><span>	@echo LIBFLAG: $(LIBFLAG)</span></span>
<span class="line"><span>	@echo LUA_LIBDIR: $(LUA_LIBDIR)</span></span>
<span class="line"><span>	@echo LUA_BINDIR: $(LUA_BINDIR)</span></span>
<span class="line"><span>	@echo LUA_INCDIR: $(LUA_INCDIR)</span></span>
<span class="line"><span>	@echo LUA: $(LUA) </span></span>
<span class="line"><span></span></span>
<span class="line"><span>install:</span></span>
<span class="line"><span>	@echo --- install</span></span>
<span class="line"><span>	@echo INST_PREFIX: $(INST_PREFIX)</span></span>
<span class="line"><span>	@echo INST_BINDIR: $(INST_BINDIR)</span></span>
<span class="line"><span>	@echo INST_LIBDIR: $(INST_LIBDIR)</span></span>
<span class="line"><span>	@echo INST_LUADIR: $(INST_LUADIR)</span></span>
<span class="line"><span>@echo INST_CONFDIR: $(INST_CONFDIR)</span></span></code></pre></div><p>Now, if you call <code>luarocks make</code>, the output will look something like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- build</span></span>
<span class="line"><span>CFLAGS: -O2 -fPIC</span></span>
<span class="line"><span>LIBFLAG: -shared</span></span>
<span class="line"><span>LUA_LIBDIR: /usr/local/lib</span></span>
<span class="line"><span>LUA_BINDIR: /usr/local/bin</span></span>
<span class="line"><span>LUA_INCDIR: /usr/local/include</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- install</span></span>
<span class="line"><span>INST_PREFIX: /usr/local/lib/luarocks/rocks/lrtest/1.0-1</span></span>
<span class="line"><span>INST_BINDIR: /usr/local/lib/luarocks/rocks/lrtest/1.0-1/bin</span></span>
<span class="line"><span>INST_LIBDIR: /usr/local/lib/luarocks/rocks/lrtest/1.0-1/lib</span></span>
<span class="line"><span>INST_LUADIR: /usr/local/lib/luarocks/rocks/lrtest/1.0-1/lua</span></span>
<span class="line"><span>INST_CONFDIR: /usr/local/lib/luarocks/rocks/lrtest/1.0-1/conf</span></span></code></pre></div><p>You will notice that the aforementioned special variables do not point to the location you&#39;d expect them to. LuaRocks will move files you put there to their final destination for you, and in the process keep track of what was installed.</p><p>The <code>CONFDIR</code> and <code>PREFIX</code> variables point to locations where you can store configuration or other data for your module. Your code must be made aware of these paths in order to use them. If you use the <code>copy_directories</code> entry in the build section of your rockspec, then what is mentioned there is copied to $(PREFIX) (i.e. a directory doc will be available unter $(PREFIX)/doc). If you copy directories in your <code>install</code> Makefile rule, you should do the same.</p><p>Now, if your Makefile is meant to be used standalone as well, which it probably is, you would also want to define these variables inside of your Makefile, but in such a way that it will not hinder LuaRocks. Luckily variables passed on the command line to make override those defined in the Makefile.</p><p>With this, a Makefile that is usable both from LuaRocks and standalone might look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CFLAGS = -fPIC -O2</span></span>
<span class="line"><span>LIBFLAG = -shared</span></span>
<span class="line"><span>LUA_LIBDIR = /usr/local/lib/lua/5.2</span></span>
<span class="line"><span>LUA_BINDIR = /usr/local/bin</span></span>
<span class="line"><span>LUA_INCDIR = /usr/local/include</span></span>
<span class="line"><span>LUA = lua</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>INST_PREFIX = /usr/local</span></span>
<span class="line"><span>INST_BINDIR = $(INST_PREFIX)/bin</span></span>
<span class="line"><span>INST_LIBDIR = $(INST_PREFIX)/lib/lua/5.2</span></span>
<span class="line"><span>INST_LUADIR = $(INST_PREFIX)/share/lua/5.2</span></span>
<span class="line"><span>INST_CONFDIR = $(INST_PREFIX)/etc</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>all:</span></span>
<span class="line"><span>	@echo --- build</span></span>
<span class="line"><span>	@echo CFLAGS: $(CFLAGS)</span></span>
<span class="line"><span>	@echo LIBFLAG: $(LIBFLAG)</span></span>
<span class="line"><span>	@echo LUA_LIBDIR: $(LUA_LIBDIR)</span></span>
<span class="line"><span>	@echo LUA_BINDIR: $(LUA_BINDIR)</span></span>
<span class="line"><span>	@echo LUA_INCDIR: $(LUA_INCDIR)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>install:</span></span>
<span class="line"><span>	@echo --- install</span></span>
<span class="line"><span>	@echo INST_PREFIX: $(INST_PREFIX)</span></span>
<span class="line"><span>	@echo INST_BINDIR: $(INST_BINDIR)</span></span>
<span class="line"><span>	@echo INST_LIBDIR: $(INST_LIBDIR)</span></span>
<span class="line"><span>	@echo INST_LUADIR: $(INST_LUADIR)</span></span>
<span class="line"><span>	@echo INST_CONFDIR: $(INST_CONFDIR)</span></span></code></pre></div><p>You probably don&#39;t just want to echo stuff, so here&#39;s how to use the variables when actually building or installing something:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>all: lrtest.so</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lrtest.so: lrtest.o</span></span>
<span class="line"><span>	$(CC) $(LIBFLAG) -o $@ -L$(LUA_LIBDIR) $&lt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>lrtest.o: lrtest.c</span></span>
<span class="line"><span>	$(CC) -c $(CFLAGS) -I$(LUA_INCDIR) $&lt; -o $@</span></span>
<span class="line"><span></span></span>
<span class="line"><span>install: lrtest.so lrtest.lua</span></span>
<span class="line"><span>	cp lrtest.so $(INST_LIBDIR)</span></span>
<span class="line"><span>	cp lrtest.lua $(INST_LUADIR)</span></span></code></pre></div><p>There is of course a lot more to a proper Makefile and rockspec, this is only to show how to take advantage of LuaRocks&#39; builtin helpers for this sort of thing. Also, keep in mind that for additional external dependencies, more variables are created by LuaRocks, which have to be passed to the Makefile in the same way. Check the other documentation, especially <a href="./rockspec_format.html">Rockspec format</a> and <a href="./recommended_practices_for_makefiles.html">Recommended practices for Makefiles</a>, for details.</p>`,22)])])}const I=s(p,[["render",t]]);export{u as __pageData,I as default};
