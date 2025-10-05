import { useEffect } from "react";

function upsertMeta(selector, attrName, value) {
    if (value == null) return null;
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement("meta");
        // selector like "meta[name='description']" -> need to set name attr separately
        const match = selector.match(/meta\[(name|property)=['"](.+)['"]\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
        return { el, created: true, prev: null };
    }
  
    return { el, created: false, prev: el.getAttribute(attrName) };
}

function upsertLinkCanonical(href) {
    if (!href) return { el: null, created: false, prev: null };
    let link = document.head.querySelector("link[rel='canonical']");
    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
        return { el: link, created: true, prev: null };
    }
    return { el: link, created: false, prev: link.href };
}

/**
 * useSEO
 * options: { title, description, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, keywords, extraMeta: [{name|'property', key, content}] }
 */
export function useSEO(options = {}) {
    const {
        title,
        description,
        canonical,
        ogTitle,
        ogDescription,
        ogImage,
        ogType = "article",
        twitterCard = "summary_large_image",
        keywords,
        extraMeta = [],
    } = options;

    useEffect(() => {
        // Store previous values for restore
        const prev = {
            title: document.title,
            meta: [],
            link: null,
        };
        // Set document title
        if (title) {
            document.title = title.includes("|") ? title : `${title} | Promptly`;
        }
        // description
        const descObj = upsertMeta("meta[name='description']", "content", description);
        if (descObj && descObj.el) {
            prev.meta.push({ selector: "meta[name='description']", prev: descObj.prev, created: descObj.created });
            descObj.el.setAttribute("content", description || "");
        }
        // keywords (optional)
        if (keywords) {
            const kwObj = upsertMeta("meta[name='keywords']", "content", keywords);
            if (kwObj && kwObj.el) {
                prev.meta.push({ selector: "meta[name='keywords']", prev: kwObj.prev, created: kwObj.created });
                kwObj.el.setAttribute("content", keywords);
            }
        }
        // Open Graph
        const ogs = [
            { sel: "meta[property='og:title']", val: ogTitle || title },
            { sel: "meta[property='og:description']", val: ogDescription || description },
            { sel: "meta[property='og:type']", val: ogType },
            { sel: "meta[property='og:image']", val: ogImage },
            { sel: "meta[property='og:url']", val: canonical || window.location.href },
        ];
        
        ogs.forEach((o) => {
            if (o.val == null) return;
            const res = upsertMeta(o.sel, "content", o.val);
            if (res && res.el) {
                prev.meta.push({ selector: o.sel, prev: res.prev, created: res.created });
                res.el.setAttribute("content", o.val);
            }
        });

        // Twitter
        const tws = [
            { sel: "meta[name='twitter:card']", val: twitterCard },
            { sel: "meta[name='twitter:title']", val: ogTitle || title },
            { sel: "meta[name='twitter:description']", val: ogDescription || description },
            { sel: "meta[name='twitter:image']", val: ogImage },
        ];
        
        tws.forEach((t) => {
            if (t.val == null) return;
            const res = upsertMeta(t.sel, "content", t.val);
            if (res && res.el) {
                prev.meta.push({ selector: t.sel, prev: res.prev, created: res.created });
                res.el.setAttribute("content", t.val);
            }
        });
        // extra meta array: [{ type: 'name'|'property', key: 'author', content: 'John' }]
        extraMeta.forEach((m) => {
            const sel = m.type === "property" ? `meta[property='${m.key}']` : `meta[name='${m.key}']`;
            const res = upsertMeta(sel, "content", m.content);
            if (res && res.el) {
                prev.meta.push({ selector: sel, prev: res.prev, created: res.created });
                res.el.setAttribute("content", m.content);
            }
        });
        // canonical link
        const linkObj = upsertLinkCanonical(canonical || window.location.href);
        if (linkObj && linkObj.el) {
            prev.link = { prev: linkObj.prev, created: linkObj.created };
            linkObj.el.href = canonical || window.location.href;
        }
        // cleanup: restore previous values
        return () => {
            // restore title
            document.title = prev.title || document.title;
            // restore meta tags
            prev.meta.forEach((m) => {
                const el = document.head.querySelector(m.selector);
                if (!el) return;
                if (m.prev == null && m.created) {
                    // we created it -> remove
                    el.parentNode.removeChild(el);
                } else {
                    // restore previous value
                    el.setAttribute("content", m.prev || "");
                }
            });
            // restore canonical
            if (prev.link) {
                const el = document.head.querySelector("link[rel='canonical']");
                if (el) {
                    if (prev.link.prev == null && prev.link.created) {
                    el.parentNode.removeChild(el);
                } else {
                    el.href = prev.link.prev || "";
                }
            }
        }
    };
    // NOTE: extraMeta may be array; shallow compare via JSON for simplicity
    }, [
        title,
        description,
        canonical,
        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        twitterCard,
        keywords,
        JSON.stringify(extraMeta),
    ]);
}
