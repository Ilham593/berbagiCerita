import AddStoryPresenter from "../../presenter/add-story-presenter";
export default class AddStoryPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita Baru</h1>

        <form id="add-story-form">
          <label for="description">Deskripsi</label>
          <textarea id="description" rows="4" required></textarea>

          <label>Ambil Foto dari Kamera</label>
          <video id="camera-video" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 8px;"></video>
          <p style="font-size: 0.9rem; color: #555; margin-top: 6px;">Cukup 1 klik untuk ambil foto.</p>
          <button type="button" id="capture-btn">Ambil Foto</button>
          <canvas id="snapshot-canvas" style="display: none;"></canvas>
          <img id="preview-image" style="display: none; width: 100%; margin-top: 1rem; border-radius: 8px;" />

          <label>Lokasi</label>
          <div id="map" style="height: 300px; margin-bottom: 1rem;"></div>
          <input type="hidden" id="lat" />
          <input type="hidden" id="lon" />

          <button type="submit">Kirim Cerita</button>
        </form>

        <div id="submit-message"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      const section = document.querySelector('.container');
      section.innerHTML = `
        <p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>
      `;
      return;
    }

    this.#presenter = new AddStoryPresenter({
      view: this,
      token,
    });

    await this.#presenter.initialize();
  }

  showMessage(message, type = 'success') {
    const messageEl = document.getElementById('submit-message');
    messageEl.style.color = type === 'success' ? 'green' : 'red';
    messageEl.textContent = message;
  }
}
