import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  primaryContained: {
    color: theme.palette.primary.contrastText,
  },
  secondaryContained: {
    color: theme.palette.secondary.contrastText,
  },
  defaultContained: {
    color: 'inherit',
  },
  primary: {
    color: theme.palette.primary,
  },
  secondary: {
    color: theme.palette.secondary,
  },
  default: {
    color: 'inherit',
  },
}));

const calcStyles = (classes, color, variant) => {
  const array = [classes.root];
  let key = color;
  if (!key) {
    key = 'default';
  }
  if (variant === 'contained') {
    key = `${key}Contained`;
  }

  const style = classes[key];
  if (style) {
    array.push(style);
  }

  console.log('===----', key, color, variant, array);
  return clsx(...array);
};

const LoadingIndicator = (props) => {
  const { color, variant } = props;

  const spinStyles = useStyles();
  const spinClass = calcStyles(spinStyles, color, variant);
  console.log('spinClass:', spinClass);

  // TODO: size map
  return <CircularProgress className={spinClass} size={20} />;
};

const LoadButton = React.forwardRef(function LoadButton(props, ref) {
  const {
    color,
    variant,
    loading,
    loadingPosition,
    startIcon,
    endIcon,
    onClick,
    children,
    ...rest
  } = props;
  const loadingStyle = { opacity: 0.75 };

  const iconProps = {
    startIcon,
    endIcon,
  };
  if (loading) {
    const overrideIcon = <LoadingIndicator color={color} variant={variant} />;
    if (loadingPosition === 'end') {
      iconProps.endIcon = overrideIcon;
    } else {
      iconProps.startIcon = overrideIcon;
    }
  }

  const handleClick = (event) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      ref={ref}
      color={color}
      variant={variant}
      onClick={handleClick}
      {...iconProps}
      {...rest}
      disableElevation={loading}
      disableFocusRipple={loading}
      disableTouchRipple={loading}
      disableRipple={loading}
      style={loading ? loadingStyle : {}}
    >
      {children}
    </Button>
  );
});

export default LoadButton;
