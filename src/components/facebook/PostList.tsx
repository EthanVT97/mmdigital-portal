import React from 'react';
import { Post } from '@/types/facebook';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export interface PostListProps {
  pageId: string;
  posts: Post[];
  onDelete: (postId: string) => Promise<void>;
}

export function PostList({ pageId, posts, onDelete }: PostListProps) {
  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await onDelete(postId);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6">{post.message}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {format(new Date(post.created_time), 'PPP')}
                    </Typography>
                    {post.insights && post.insights.engagement && (
                      <Box mt={2}>
                        <Typography variant="body2">
                          👍 {post.insights.engagement.likes} likes
                        </Typography>
                        <Typography variant="body2">
                          💬 {post.insights.engagement.comments} comments
                        </Typography>
                        <Typography variant="body2">
                          🔄 {post.insights.engagement.shares} shares
                        </Typography>
                        <Typography variant="body2">
                          👥 {post.insights.reach} reach
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <IconButton onClick={() => handleDelete(post.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
