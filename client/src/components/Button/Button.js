import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cn = classNames.bind(styles)

function Button({
  small = false,
  large = false,
  red = false,
  primary = false,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Comp = 'button'
  const props = {
    onClick,
    ...passProps,
  }

  const classes = cn('wrapper', {
    [className]: className,
    small,
    large,
    red,
    primary,
  })

  return (
    <Comp className={classes} {...props}>
      <span className={cn('title')}>{children}</span>
    </Comp>
  )
}

export default Button
