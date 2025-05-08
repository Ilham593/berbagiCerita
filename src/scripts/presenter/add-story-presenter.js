export default class AddStoryPresenter {
  #view;
  #token;
  #capturedBlob = null;
  #stream = null;
  #marker = null;

  constructor({ view, token }) {
    this.#view = view;
    this.#token = token;
  }

  async initialize() {
    this.#setupMap();
    await this.#setupCamera();
    this.#setupCaptureButton();
    this.#setupForm();
  }

  #setupMap() {
    const map = L.map('map').setView([-2.5, 118], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.getElementById('lat').value = lat;
      document.getElementById('lon').value = lng;

      if (this.#marker) {
        this.#marker.remove();
      }

      this.#marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>Lokasi dipilih:</strong><br>${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup();
    });
  }

  async #setupCamera() {
    try {
      this.#stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById('camera-video');
      video.srcObject = this.#stream;
    } catch (err) {
      console.error('Tidak dapat mengakses kamera:', err);
      this.#view.showMessage('Tidak dapat mengakses kamera.', 'error');
    }
  }

  #setupCaptureButton() {
    const canvas = document.getElementById('snapshot-canvas');
    const video = document.getElementById('camera-video');
    const captureBtn = document.getElementById('capture-btn');
    const preview = document.getElementById('preview-image');

    captureBtn.addEventListener('click', () => {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          this.#view.showMessage('Gagal menangkap gambar.', 'error');
          return;
        }

        this.#capturedBlob = blob;

        if (preview) {
          preview.src = URL.createObjectURL(blob);
          preview.style.display = 'block';
        }

        if (this.#stream) {
          this.#stream.getTracks().forEach((track) => track.stop());
        }
      }, 'image/jpeg');
    });
  }


  #setupForm() {
    const form = document.getElementById('add-story-form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const description = document.getElementById('description').value;
      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;

      if (!this.#capturedBlob || !description) {
        this.#view.showMessage('Foto dan deskripsi wajib diisi.', 'error');
        return;
      }

      const photoFile = new File([this.#capturedBlob], 'snapshot.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', photoFile);
      if (lat && lon) {
        formData.append('lat', lat);
        formData.append('lon', lon);
      }

      try {
        const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.#token}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          this.#view.showMessage(result.message || 'Cerita berhasil dikirim!');
          form.reset();

          setTimeout(() => {
            location.hash = '#/';
          }, 1000);
        } else {
          throw new Error(result.message || 'Gagal mengirim cerita.');
        }

      } catch (error) {
        console.error(error);
        this.#view.showMessage('Gagal mengirim cerita.', 'error');
      }
    });
  }
}
