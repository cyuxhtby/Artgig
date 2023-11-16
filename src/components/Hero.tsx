import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface HeroProps {
    headline: string;
    subHeadline: string;
    ctaText: string;
}

interface ShaderMaterialUniforms {
    [uniform: string]: THREE.IUniform<any>;
    u_resolution: { value: THREE.Vector2 };
    u_time: { value: number };
}

const Hero: React.FC<HeroProps> = ({ headline, subHeadline, ctaText }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
            uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Linear vertical gradient from black to black
    vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0), st.y);

    gl_FragColor = vec4(color, 1.0);
}

            
            `,
            uniforms: {
                u_resolution: { value: new THREE.Vector2() },
                u_time: { value: 1.0 }
            } as ShaderMaterialUniforms
        });
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.u_time.value += 0.05;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        
            // Update the u_resolution uniform after resizing
            material.uniforms.u_resolution.value.set(width, height);
        };
        

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        }
    }, []);

    return (
        <div className="hero" ref={mountRef} style={{ position: 'relative', overflow: 'hidden' , maxHeight: "80vh", padding: '10px'}}>
            <h1 className="hero__headline" style={{ position: 'absolute', top: '20%', left: '0', transform: 'translate(0, -50%)', color: 'white', zIndex: 0 , fontSize: "36px", fontWeight: "bold", padding: '5px'}}>
                {headline}
            </h1>
            <h2 className="hero__subheadline" style={{ position: 'absolute', top: '30%', left: '0', transform: 'translate(0, -50%)', color: 'white', zIndex: 0 , fontSize: "24px", fontWeight: "bold", padding: '5px'}}>
                {subHeadline}
            </h2>
            <Button onClick={() => router.push('/products')} style={{ position: 'absolute', top: '40%', left: '0', transform: 'translate(0, -50%)', zIndex: 0 , fontSize: "18px", fontWeight: "bold", padding: '5px'}}>
                {ctaText}
            </Button>
        </div>
    );
}

export default Hero;
