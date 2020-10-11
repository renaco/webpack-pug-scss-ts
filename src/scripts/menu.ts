/// <reference lib="dom" />
import { HTMLElementTagNameMap } from './interface'

export const showMenu = () => {

  const menu = document.querySelectorAll<HTMLDivElement>('#menu')[0]
  const menuButton = document.querySelectorAll<HTMLElementTagNameMap['a']>('#menuButton')[0]
  const targetMenu = menu.classList
  const targetMenuButton = menuButton.classList

  function isShowMenu() {
    targetMenuButton.add('is-show')
    targetMenu.remove('is-hide')
  }

  function isHideMenu() {
    targetMenuButton.remove('is-show')
    targetMenu.add('is-hide')
  }

  menuButton.addEventListener('click', () => {
    targetMenu.contains('is-hide') ? isShowMenu() : isHideMenu()
  })
}
