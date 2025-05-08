import { getAllStories } from "../data/api";
import { db } from "../utils/db";

export default class HomePresenter {
    #view;
    #token;

    constructor({ view, token }) {
        this.#view = view;
        this.#token = token;
    }

    async showStories() {
        try {
            const stories = await getAllStories(this.#token);

            if (!stories || !Array.isArray(stories) || stories.length === 0) {
                this.#view.showEmptyState();
                return;
            }

            for (const story of stories) {
                await db.add(story).catch(() => {
                });
            }

            this.#view.showStoriesOnList(stories);
            this.#view.showStoriesOnMap(stories);
        } catch (error) {
            console.warn('Gagal mengambil dari API, mencoba ambil dari IndexedDB:', error);

            const cachedStories = await db.getAll();
            if (!cachedStories || cachedStories.length === 0) {
                this.#view.showEmptyState();
            } else {
                this.#view.showStoriesOnList(cachedStories);
                this.#view.showStoriesOnMap(cachedStories);
            }
        }
    }
}
