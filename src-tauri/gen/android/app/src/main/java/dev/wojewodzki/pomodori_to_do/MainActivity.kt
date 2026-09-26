package dev.wojewodzki.pomodori_to_do

import android.os.Build
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : TauriActivity() {
  
  private var lastInsetScript: String? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      window.isNavigationBarContrastEnforced = false
    }

    WindowCompat.getInsetsController(window, window.decorView)
      .isAppearanceLightNavigationBars = false

    ViewCompat.setOnApplyWindowInsetsListener(window.decorView) { _, insets ->
      val insetBounds = insets.getInsets(
        WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout()
      )

      // Convert physical pixels to density-independent pixels
      val density = resources.displayMetrics.density
      val top = insetBounds.top / density
      val bottom = insetBounds.bottom / density
      val left = insetBounds.left / density
      val right = insetBounds.right / density

      lastInsetScript = """
      (function() {
        function setInsets() {
          console.log('tries to set');
          if (document.documentElement) {
            console.log('is setting');
            document.documentElement.style.setProperty('--native-inset-top', '${top}px');
            document.documentElement.style.setProperty('--native-inset-bottom', '${bottom}px');
            document.documentElement.style.setProperty('--native-inset-left', '${left}px');
            document.documentElement.style.setProperty('--native-inset-right', '${right}px');
          }
        }
        if (document.readyState === 'loading') {
          console.log('is loading');
          document.addEventListener('DOMContentLoaded', setInsets);
        } else {
          console.log('is ready');
          setInsets();
        }
      })();
      """.trimIndent()

      window.decorView.post {
        val webView = findWebView(window.decorView)
        if (webView != null) {
          setupJSBridge(webView)
          lastInsetScript?.let { webView.evaluateJavascript(it, null) }
        }
      }

      insets
    }
  }

  private fun findWebView(view: android.view.View): WebView? {
    if (view is WebView) return view
    if (view is android.view.ViewGroup) {
      for (i in 0 until view.childCount) {
        val child = view.getChildAt(i)
        val result = findWebView(child)
        if (result != null) return result
      }
    }
    return null
  }

  private fun setupJSBridge(webView: WebView) {
    webView.settings.javaScriptEnabled = true

    webView.addJavascriptInterface(
      object {
        @JavascriptInterface
        fun onFrontendReady() {
          webView.post {
            lastInsetScript?.let {
              webView.evaluateJavascript(it, null)
            }
          }
        }
      },
      "android")
  }
}
