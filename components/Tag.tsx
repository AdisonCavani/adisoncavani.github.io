import Link from 'next/link'
import kebabCase from '@lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 mt-1.5 rounded-lg bg-primary-700 p-1.5 text-xs font-semibold uppercase text-primary-400 hover:text-primary-600 dark:bg-primary-900 dark:hover:text-primary-200">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
