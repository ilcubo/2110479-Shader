#ifndef NOISE_GLSL_INCLUDED
#define NOISE_GLSL_INCLUDED

uint pcg(uint v) {
  v = v * 747796405u + 2891336453u;
  uint w = ((v >> ((v >> 28u) + 4u)) ^ v) * 277803737u;
  return (w >> 22u) ^ w;
}

float hash(uvec2 p) { return float(pcg(p.x ^ pcg(p.y))) / 4294967296.0; }

// TODO(TASK 2a)
float value_noise(vec2 p) {
  uvec2 cell = uvec2(floor(p) + 1000);
  vec2 t = fract(p);
  vec2 weight = (t * t * (3.0 - 2.0 * t));

  float bottom_left = hash(cell);
  float bottom_right = hash(cell + uvec2(1, 0));
  float top_left = hash(cell + uvec2(0, 1));
  float top_right = hash(cell + uvec2(1, 1));

  float bottom = (bottom_right - bottom_left) * weight.x + bottom_left;
  float top = (top_right - top_left) * weight.x + top_left;
  float result = (top - bottom) * weight.y + bottom;
  return result;
}

// TODO(TASK 2b)
float fbm(vec2 p, uint octaves) {
  uint i = 0;
  float result = 0;
  for (i = 0; i < octaves; i++) {
    result += pow(0.5, i + 1) * value_noise(p * pow(2.0, i));
  }
  return result;
}

#endif
