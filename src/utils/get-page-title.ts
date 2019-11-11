import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle: any) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
