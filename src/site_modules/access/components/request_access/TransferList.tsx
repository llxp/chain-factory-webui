import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Resource } from './models/Resource';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.background.paper
    },
    list: {
      width: 200,
      height: 230,
      backgroundColor: theme.palette.background.default,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: '#bbbbbb'
      }
    },
  }),
);

function not(a: Resource[], b: Resource[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: Resource[], b: Resource[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: Resource[], b: Resource[]) {
  return [...a, ...not(b, a)];
}

interface IProps {
  items: Array<Resource>;
  handleChange: (itemsChecked) => void;
}

export function TransferList(props: IProps) {
  console.log(props.items);
  const classes = useStyles();
  const [checked, setChecked] = React.useState<Resource[]>([]);
  const [left, setLeft] = React.useState<Resource[]>([...props.items]);  // [0, 1, 2, 3]
  const [right, setRight] = React.useState<Resource[]>([]);

  props.handleChange(right);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: Resource) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: Resource[]) => intersection(checked, items).length;

  const handleToggleAll = (items: Resource[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    console.log('transfer to right');
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: Resource[]) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            //className={classes.checkBox}
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: Resource) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.display_name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root} wrap="nowrap">
      <Grid item>{customList('Available', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="stretch">
          <Button
            variant="outlined"
            size="large"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="large"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item alignItems="stretch" justify="center">{customList('Selected', right)}</Grid>
    </Grid>
  );
}