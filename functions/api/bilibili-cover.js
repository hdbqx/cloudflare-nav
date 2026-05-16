/**
 * ==========================================
 * bilibili-cover.js - Bilibili 封面代理 API
 * 路由: /api/bilibili-cover?bvid=BVxxxxxx
 * 解决前端直接请求 Bilibili API 的 CORS 问题
 * 通过 Cloudflare Pages Functions 服务端中转
 * ==========================================
 */

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bvid = url.searchParams.get('bvid');

  // CORS 头（允许跨域）
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // 仅支持 GET
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }

  // 参数校验
  if (!bvid || !/^BV[a-zA-Z0-9]+$/.test(bvid)) {
    return new Response(JSON.stringify({ error: 'Invalid bvid parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }

  try {
    // 服务端请求 Bilibili API（无 CORS 限制）
    const biliRes = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
      },
      cf: { cacheTtl: 86400 }, // 缓存 24 小时
    });

    if (!biliRes.ok) {
      return new Response(JSON.stringify({ error: 'Bilibili API error', status: biliRes.status }), {
        status: biliRes.status,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
      });
    }

    const biliData = await biliRes.json();

    // 提取封面 URL 返回
    const coverUrl = biliData?.data?.pic || null;

    return new Response(JSON.stringify({
      code: biliData.code,
      bvid,
      coverUrl,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }
}
