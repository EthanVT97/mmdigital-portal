import { API_ENDPOINTS } from '@/config/api';

export interface Advertisement {
    id?: number;
    title: string;
    description: string;
    price: number;
    image_url?: string;
    category: string;
    contact_info: string;
    created_at?: string;
    updated_at?: string;
}

export interface AdvertisementFilters {
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    per_page?: number;
}

export const advertisementService = {
    async getAll(filters: AdvertisementFilters = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value.toString());
        });

        const response = await fetch(`${API_ENDPOINTS.advertisements}?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch advertisements');
        return response.json();
    },

    async getById(id: number) {
        const response = await fetch(`${API_ENDPOINTS.advertisements}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch advertisement');
        return response.json();
    },

    async create(data: FormData) {
        const response = await fetch(API_ENDPOINTS.advertisements, {
            method: 'POST',
            body: data,
        });
        if (!response.ok) throw new Error('Failed to create advertisement');
        return response.json();
    },

    async update(id: number, data: FormData) {
        data.append('_method', 'PUT'); // Laravel requires this for PUT requests with FormData
        const response = await fetch(`${API_ENDPOINTS.advertisements}/${id}`, {
            method: 'POST',
            body: data,
        });
        if (!response.ok) throw new Error('Failed to update advertisement');
        return response.json();
    },

    async delete(id: number) {
        const response = await fetch(`${API_ENDPOINTS.advertisements}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete advertisement');
        return response.json();
    },

    async getCategories() {
        const response = await fetch(API_ENDPOINTS.categories);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },
};
