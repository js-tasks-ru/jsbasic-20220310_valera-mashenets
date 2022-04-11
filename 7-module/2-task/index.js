import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createTmpl();
    this.keyBind = this.key.bind(this);
  }

  createTmpl() {
    let tmpl = createElement(`
    <div class="modal">
			<div class="modal__overlay"></div>
			<div class="modal__inner">
			<div class="modal__header">
				<button type="button" class="modal__close">
				<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
				</button>
				<h3 class="modal__title"></h3>
			</div>
			<div class="modal__body"></div>
			</div>
		</div>`);

    return tmpl;
  }

  open() {
    if (!document.querySelector('.modal')) {
      document.body.classList.add('is-modal-open');
      document.body.append(this.modal);
      this.handlers();
    }
  }

  close() {
    if (document.querySelector('.modal')) {
      document.body.classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
      document.removeEventListener('keydown', this.keyBind);
    }
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').appendChild(node);
  }

  key(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  handlers() {
    document.addEventListener('keydown', this.keyBind);
    this.modal.querySelector('.modal__close').addEventListener('click', this.close);
  }
}