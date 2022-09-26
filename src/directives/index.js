
export const imgerror = {
  inserted(el, binding, vunode) {
    console.log(el)
    console.log(binding)
    console.log(vunode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
