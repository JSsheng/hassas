
export const imgerror = {
  inserted(el, binding, vunode) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
