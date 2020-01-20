/**
 * 1. 指令 (若无<span>子元素，children[0].cloneNode会报错)
 * <div style="width:100px;overflow:hidden">
 *   <p v-marquee>
 *    <span>demodemodemo</span>
 *   </p>
 * </div>
 * 2. .marquee 类名
 * p{
 *  white-space: nowrap;
 * }
 * p.marquee {
 *   word-break: keep-all;
 *   width: fit-content; // NOTE 必须
 *   animation: textloop linear infinite;
 *   min-width: 100%;
 *   span {
 *     padding-right: 20px
 *   }
 * }
 * 3. 动画
 * @keyframes textloop {
 *   0% {
 *     transform: translateX(0);
 *   }
 *   100% {
 *     transform: translateX(-50%);
 *   }
 * }
*/
/* eslint-disable no-param-reassign */
const marquee = (el:any) => {
  if (el.classList.contains('marquee')) return;
  let timer:any = null;
  timer = setTimeout(() => {
    const { offsetWidth } = el;
    const { scrollWidth } = el;
    if (offsetWidth && scrollWidth && (scrollWidth > offsetWidth)) {
      const clone = el.children[0].cloneNode(true); // 复制一次 <span> 子元素
      el.appendChild(clone);
      el.style.cssText += `;-webkit-animation-duration:${scrollWidth / 30}s;animation-duration:${scrollWidth / 30}s;--offset:${offsetWidth - scrollWidth * 2 - 20}px`;
      el.classList.add('marquee');
      clearTimeout(timer);
    }
  }, 20);
};


export default marquee;
