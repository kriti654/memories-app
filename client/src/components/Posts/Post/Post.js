import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './style';


const Post = ({post, setCurrentId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <Card className= {classes.card}>
            <CardMedia className= {classes.media} image = {post.selectedFile} title = {post.title}/>
            <div className= {classes.overlay}>
                <Typography variant= 'h6'>{post.creator}</Typography>
                <Typography>{moment(post.createdAt).fromNow}</Typography>
            </div>
            <div className= {classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick = {() => setCurrentId(post._id)}>
                    <MoreHorizon fontSize='default' />
                </Button>
            </div>
            <div className= {classes.details}>
                <Typography variant= 'body2' color= 'textSecondary'>{post.tags.map((tag) =>`#${tag} `)}</Typography>
            </div>
            <Typography className= {classes.title} variant= 'h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography className= {classes.title} variant= 'body2'>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button color='primary' size='small' onClick = {() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button color='primary' size='small' onClick = {() =>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post