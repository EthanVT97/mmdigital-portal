import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { BusinessSuitePost } from '@/types/facebook';

type CreatePostInput = Omit<BusinessSuitePost, 'id' | 'created_time' | 'status'> & {
  scheduledFor?: Date;
};

export interface PostEditorProps {
  pageId: string;
  pageName: string;
  onSubmit: (post: CreatePostInput) => Promise<void>;
}

export function PostEditor({ pageId, pageName, onSubmit }: PostEditorProps) {
  const [postData, setPostData] = useState<CreatePostInput>({
    message: '',
    link: '',
    targeting: {
      age_min: undefined,
      age_max: undefined,
      genders: [],
      geo_locations: {
        countries: [],
        cities: [],
      },
    },
    feed_targeting: {
      fan_only: false,
      countries: [],
      education_statuses: [],
      relationship_statuses: [],
    },
    privacy: {
      value: 'EVERYONE',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(postData);

      // Clear form
      setPostData({
        message: '',
        link: '',
        targeting: {
          age_min: undefined,
          age_max: undefined,
          genders: [],
          geo_locations: {
            countries: [],
            cities: [],
          },
        },
        feed_targeting: {
          fan_only: false,
          countries: [],
          education_statuses: [],
          relationship_statuses: [],
        },
        privacy: {
          value: 'EVERYONE',
        },
      });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Post for {pageName}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link (optional)"
                value={postData.link}
                onChange={(e) => setPostData({ ...postData, link: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Schedule Post (optional)"
                value={postData.scheduledFor}
                onChange={(newValue) => setPostData({ ...postData, scheduledFor: newValue })}
                minDateTime={new Date()}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading || !postData.message.trim()}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
