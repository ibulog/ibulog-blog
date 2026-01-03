import type { Alpine } from 'alpinejs'
import collapse from '@alpinejs/collapse'
import intersect from '@alpinejs/intersect'

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse)
  Alpine.plugin(intersect)

  // TocButtonストアをApline,js初期化時に初期化
  Alpine.store("tocButton", {
    show: false,
    toggleShow() {
      this.show = !this.show;
    },
    expanded: false,
    toggleExpanded() {
      this.expanded = !this.expanded;
    }
  });
}
