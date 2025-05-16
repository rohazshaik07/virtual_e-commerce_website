"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

interface EnhancedThreeJsViewerProps {
  modelPath?: string
  autoRotate?: boolean
}

export default function EnhancedThreeJsViewer({
  modelPath = "/models/hoodie.glb",
  autoRotate = true,
}: EnhancedThreeJsViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add opposite directional light for better illumination
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
    backLight.position.set(-5, 5, -5)
    scene.add(backLight)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2
    camera.position.y = 0.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 1
    controls.maxDistance = 5
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1.0
    controls.enablePan = false

    // GLTF Loader with Draco compression support
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    // Load the model
    gltfLoader.load(
      modelPath,
      (gltf) => {
        // Model loaded successfully
        const model = gltf.scene

        // Center the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        // Scale the model to fit the view
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 1.5 / maxDim
        model.scale.set(scale, scale, scale)

        // Add the model to the scene
        scene.add(model)

        // Loading complete
        setIsLoading(false)
      },
      // Progress callback
      (xhr) => {
        setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100))
      },
      // Error callback
      (error) => {
        console.error("Error loading model:", error)
        setIsLoading(false)

        // Fallback to a basic geometry if model fails to load
        const geometry = new THREE.BoxGeometry(1, 1.5, 0.5)
        const material = new THREE.MeshStandardMaterial({
          color: 0x333333,
          roughness: 0.7,
          metalness: 0.1,
        })
        const fallbackModel = new THREE.Mesh(geometry, material)
        scene.add(fallbackModel)
      },
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth / containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      controls.dispose()
    }
  }, [modelPath, autoRotate])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-lg mb-4">Loading 3D Model...</div>
          <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-white text-sm mt-2">{loadingProgress}%</div>
        </div>
      )}
    </div>
  )
}
