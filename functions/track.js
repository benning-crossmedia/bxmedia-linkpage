export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { link } = await request.json();
    if (!link) return new Response("missing link", { status: 400 });

    const key = `click_${link}`;
    const current = parseInt(await env.BXMEDIA_CLICKS.get(key) || "0");
    await env.BXMEDIA_CLICKS.put(key, String(current + 1));

    return new Response("ok", {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST" }
  });
}
