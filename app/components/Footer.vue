<template>
  <footer>
    <div class="container">
      <p>
        made by <a
          href="https://jankohlbach.com"
          target="_blank"
          class="credits"
        >https://jankohlbach.com</a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding-block: to-rem(20);
}

.container {
  display: flex;
  justify-content: center;
}

.credits {
  position: relative;

  &::before {
    content: '✌️';
    position: absolute;
    top: 0%;
    left: 105%;
    opacity: 0;
    transform: rotate(-10deg) translateY(30%) rotate(-45deg);
    transition: all 0.7s var(--ease-spring);
  }

  @include has-hover {
    &:hover {
      &::before {
        opacity: 1;
        transform: none;
      }
    }
  }
}
</style>
