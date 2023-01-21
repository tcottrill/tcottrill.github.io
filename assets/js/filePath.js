var relative = null;
if (location.protocol === 'file:') {
  /**
   * @type NodeListOf<HTMLLinkElement>
   */
  let canonLink = document.querySelectorAll('link[rel="canonical"]');

  if (relative == '') relative = './';
  relative = Array(canonLink.forEach(link => link.href.match(/\//g).length - 2)).join('../')
}
/**
 * @param {string} link
 * @param {boolean} index
 */
function to_relative(link, index) {
  if (!relative) return link;
  var hash = link ? link.match(/#.*$/) : null;
  if (hash) link = link.replace(/#.*$/, '');
  return link ? (link.replace(/^\//, relative) + (index ? (link.substr(-1) == '/' ? 'index.html' : '') : '') + (hash ? hash[0] : '')) : null;
}

(function () {
  if (relative) {
    document.querySelectorAll('a').forEach(anchor => { anchor.href = to_relative(anchor.href, true); });
    document.querySelectorAll('img').forEach(image => { image.src = to_relative(image.src, false); });
  }
});

