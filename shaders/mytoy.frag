#version 450
#extension GL_GOOGLE_include_directive : require

#include <shadertoy.glsl>
#include <noise.glsl>

float sdf_circle(in vec2 p, in float r) {
  return length(p) - r;
}
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = (2.0 * fragCoord - 1.0 * iResolution.xy) / iResolution.y;

  vec2 window_pos = vec2(0.0);
  vec3 clouds = 0.3 * vec3(1.0 * fbm(uv * 3.0 + iTime, 4));
  vec3 sunset_col = mix(vec3(0.8, 0.4, 0.1),
    vec3(0.2, 0.1, 0.3),
    smoothstep(-0.9, 0.0, uv.y));

  if (length(iMouse.zw) > 0.0) {
    window_pos = (2.0 * iMouse.xy - 1.0 * iResolution.xy) / iResolution.y;
  }

  vec3 sky = sunset_col + clouds;
  vec3 col = vec3(0.0);
  if (iMode == 0u) {
    col = mix(sky, vec3(0.0), smoothstep(0.0, 0.025, sdf_circle(uv - window_pos, 0.5)));
  } else if (iMode == 1u) {
    col = sky;
  } else if (iMode == 2u) {
    col = mix(vec3(1.0), vec3(0.0), smoothstep(0.0, 0.025, sdf_circle(uv - window_pos, 0.5)));
  }
  fragColor = vec4(col, 1.0);
}
